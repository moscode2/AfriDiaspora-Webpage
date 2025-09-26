"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../lib/utils";

/* ---------------------------
   Theme / config types
   --------------------------- */

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfigItem = {
  label?: React.ReactNode;
  icon?: React.ComponentType;
} & (
  | { color?: string; theme?: never }
  | { color?: never; theme: Record<keyof typeof THEMES, string> }
);

export type ChartConfig = Record<string, ChartConfigItem>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/* ---------------------------
   Container + dynamic CSS variables
   --------------------------- */

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

/* ChartStyle: produce CSS custom properties for colors by theme */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, conf]) => !!(conf.theme || conf.color));

  if (!colorConfig.length) {
    return null;
  }

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const rules = colorConfig
        .map(([key, itemConfig]) => {
          // itemConfig may have a theme or color
          const themeColors = (itemConfig as ChartConfigItem).theme;
          const color =
            (themeColors && theme in themeColors && themeColors[theme as keyof typeof themeColors]) ||
            (itemConfig as ChartConfigItem).color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");

      return `${prefix} [data-chart='${id}'] {\n${rules}\n}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

/* ---------------------------
   Types for payload / legend
   --------------------------- */

type RechartsPayloadItem = {
  dataKey?: string | number;
  name?: string;
  value?: unknown;
  color?: string;
  payload?: Record<string, unknown>;
  [k: string]: unknown;
};

type RechartsLegendPayloadItem = {
  value?: string | number;
  dataKey?: string | number;
  color?: string;
  payload?: Record<string, unknown>;
  [k: string]: unknown;
};

/* ---------------------------
   Tooltip
   --------------------------- */

const ChartTooltip = RechartsPrimitive.Tooltip;

type TooltipExtraProps = {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  labelClassName?: string;
};

type ChartTooltipContentProps = React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> &
  TooltipExtraProps;

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
      ...rest
    },
    ref
  ) => {
    const { config } = useChart();

    const typedPayload = Array.isArray(payload) ? (payload as RechartsPayloadItem[]) : undefined;

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !typedPayload || typedPayload.length === 0) {
        return null;
      }

      const item = typedPayload[0];
      const firstKey = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;

      const itemConfig = getPayloadConfigFromPayload(config, item, firstKey);

      // label may be a string or ReactNode — compute the best value
      let computedLabel: React.ReactNode | undefined;
      if (!labelKey && typeof label === "string") {
        const labelStr = label;
        computedLabel = config[labelStr]?.label ?? labelStr;
      } else {
        computedLabel = itemConfig?.label;
      }

      if (typeof labelFormatter === "function") {
        // labelFormatter signature varies depending on Recharts; call it defensively
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(computedLabel, typedPayload)}</div>;
      }

      if (!computedLabel) return null;
      return <div className={cn("font-medium", labelClassName)}>{computedLabel}</div>;
    }, [label, labelFormatter, typedPayload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !typedPayload || typedPayload.length === 0) {
      return null;
    }

    const nestLabel = typedPayload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {typedPayload.map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);

            const indicatorColor =
              color ??
              (item && typeof item.payload === "object" && item.payload && ("fill" in item.payload ? (item.payload as Record<string, unknown>)["fill"] : undefined)) ??
              item.color ??
              "currentColor";

            const itemKey = String(item.dataKey ?? item.name ?? item.value ?? index);

            // build CSS custom property object safely
            const styleVars = { } as React.CSSProperties & Record<string, string>;
            styleVars["--color-bg"] = String(indicatorColor);
            styleVars["--color-border"] = String(indicatorColor);

            return (
              <div
                key={itemKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {typeof formatter === "function" && item?.value !== undefined && item.name ? (
                  // call Recharts formatter defensively — it can return ReactNode or string
                  (formatter as (...args: unknown[]) => React.ReactNode)(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={styleVars}
                        />
                      )
                    )}
                    <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label ?? item.name}</span>
                      </div>
                      {item.value !== undefined && item.value !== null && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

/* ---------------------------
   Legend
   --------------------------- */

const ChartLegend = RechartsPrimitive.Legend;

type ChartLegendContentProps = React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  };

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();

    const typedPayload = Array.isArray(payload) ? (payload as RechartsLegendPayloadItem[]) : undefined;

    if (!typedPayload || typedPayload.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
      >
        {typedPayload.map((item) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          const uniqueKey = String(item.value ?? item.dataKey ?? key);

          return (
            <div key={uniqueKey} className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color ?? "transparent",
                  }}
                />
              )}
              {itemConfig?.label ?? item.value}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";

/* ---------------------------
   Helper: getPayloadConfigFromPayload
   --------------------------- */

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadRecord = payload as Record<string, unknown>;

  const payloadPayload =
    "payload" in payloadRecord && typeof payloadRecord.payload === "object" && payloadRecord.payload !== null
      ? (payloadRecord.payload as Record<string, unknown>)
      : undefined;

  let configLabelKey: string = key;

  if (key in payloadRecord && typeof payloadRecord[key] === "string") {
    configLabelKey = String(payloadRecord[key]);
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = String(payloadPayload[key]);
  }

  // ChartConfig is Record<string, ChartConfigItem>, safe to index by string
  return configLabelKey in config ? config[configLabelKey] : config[key];
}

/* ---------------------------
   Exports
   --------------------------- */

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };

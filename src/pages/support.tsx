import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Support() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Support AfriEuropa News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground text-lg">
            AfriEuropa News is dedicated to bringing you high-quality journalism 
            about Africa and its diaspora in Europe. Your support helps us 
            continue reporting stories that matter.
          </p>

          <div className="space-y-4">
            {/* PayPal Button */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold shadow-md"
            >
              <a
                href="https://www.paypal.com/donate"
                target="_blank"
                rel="noopener noreferrer"
              >
                💳 Donate with PayPal
              </a>
            </Button>

            {/* Stripe Button */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md"
            >
              <a
                href="https://stripe.com/donate"
                target="_blank"
                rel="noopener noreferrer"
              >
                🌍 Donate with Stripe
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Every contribution, big or small, helps us keep AfriEuropa News alive.  
            Thank you for your support! ❤️
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

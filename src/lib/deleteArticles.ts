import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import toast from "react-hot-toast";

interface DeleteArticleProps {
  articleId: string;
  onDeleted: (deletedId: string) => void;
}

export const deleteArticle = async ({ articleId, onDeleted }: DeleteArticleProps) => {
  if (!articleId) return;

  try {
    await deleteDoc(doc(db, "articles", articleId));
    toast.success("Article deleted successfully!");
    onDeleted(articleId);
  } catch (err) {
    console.error("Error deleting article:", err);
    toast.error("Failed to delete article");
  }
};

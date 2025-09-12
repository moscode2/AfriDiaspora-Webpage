import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import toast from "react-hot-toast";

interface DeleteArticleProps {
  articleId: string | number;           // accept number too
  onDeleted: (deletedId: string) => void;
}

export const deleteArticle = async ({ articleId, onDeleted }: DeleteArticleProps) => {
  if (articleId === undefined || articleId === null) return;

  const docId = articleId.toString(); // ✅ ensure string

  try {
    await deleteDoc(doc(db, "articles", docId));
    toast.success("Article deleted successfully!");
    onDeleted(docId);
  } catch (err) {
    console.error("deleteArticle error:", err);
    toast.error("Failed to delete article");
  }
};

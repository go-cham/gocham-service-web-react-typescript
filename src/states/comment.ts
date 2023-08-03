import { atom } from 'jotai';

interface CommentStateAtom {
  postId: number | null;
  replyingTo: {
    id: number;
    nickname: string;
    commentId: number;
  } | null;
  parentCommentId: number | null;
}

export const commentStateAtom = atom<CommentStateAtom>({
  postId: null,
  replyingTo: null,
  parentCommentId: null,
});

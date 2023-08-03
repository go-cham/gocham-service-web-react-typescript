import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useDeletePost from '@/apis/hooks/posts/useDeletePost';
import useGetComments from '@/apis/hooks/posts/useGetComments';
import useGetPost from '@/apis/hooks/posts/useGetPost';
import useUser from '@/apis/hooks/users/useUser';
import ImageFullScreen from '@/components/ImageFullScreen';
import MoreIcon from '@/components/icons/MoreIcon';
import TopAppBar from '@/components/layout/TopAppBar';
import PostUserProfile from '@/components/post/PostUserProfile';
import Dropdown from '@/components/ui/Dropdown';
import Popup from '@/components/ui/modal/Popup/Popup';
import CommentSkeleton from '@/components/ui/skeleton/CommentSkeleton';
import PostSummarySkeleton from '@/components/ui/skeleton/PostSummarySkeleton';
import CommentInput from '@/pages/comment/CommentInput';
import CommentList from '@/pages/comment/CommentList';
import ImageList from '@/pages/comment/ImageList';
import { PostDetailContent } from '@/pages/feed/PostDetail/PostDetail';
import { commentStateAtom } from '@/states/comment';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';
import { getRemainingTime } from '@/utils/getRemainingTime';

enum MENU {
  Edit,
  Delete,
  Report,
}

export default function CommentPage() {
  const [commentState, setCommentState] = useAtom(commentStateAtom);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { user } = useUser();
  const { id: postId } = useParams();
  const { comments, isLoading: commentLoading } = useGetComments(
    Number(postId)
  );
  const { post, error } = useGetPost(Number(postId));
  const {
    deletePost,
    error: deletePostError,
    isSuccess: deletePostSuccess,
  } = useDeletePost();
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  const handleDropdownSelect = (value: number) => {
    if (value === MENU.Report) {
      navigate(`/feed/${post?.id}/report`);
    }
    if (value === MENU.Edit) {
      navigate(`/feed/${post?.id}/edit`);
    }
    if (value == MENU.Delete) {
      if (post) {
        if (getRemainingTime(post.expirationTime) === 'closed') {
          alert('투표가 종료된 게시물은 삭제하실 수 없습니다.');
          setShowMore(false);
          return;
        }
      }
      setDeleteModalOpen(true);
    }
  };

  useEffect(() => {
    if (deletePostSuccess) {
      alert('게시물이 정상적으로 삭제되었습니다.');
      setDeleteModalOpen(false);
      navigate(-1);
    }
    if (deletePostError) {
      alert('오류가 발생하였습니다.');
    }
    setShowMore(false);
  }, [error, deletePostSuccess]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMore(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCommentState((prevState) => ({
      ...prevState,
      postId: postId ? Number(postId) : null,
    }));

    return () => {
      setCommentState((prevState) => ({
        ...prevState,
        postId: null,
      }));
    };
  }, [postId]);

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title="댓글" />
      <div
        id="comment-page"
        className="hide-scrollbar flex-1 overflow-y-scroll"
      >
        <div className="flex flex-col border-b border-background-dividerLine-300 pb-[1.9rem] pt-[2.1rem]">
          {post && user ? (
            <>
              <div className="flex items-center justify-between px-[2.5rem]">
                <PostUserProfile
                  nickname={post.user.nickname}
                  age={calculateAgeFromBirthday(post.user.birthDate)}
                  color="gray"
                />
                <div className="relative" ref={dropdownRef}>
                  <MoreIcon
                    className="cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                  />
                  {showMore && (
                    <Dropdown
                      options={
                        user.id === post.user.id
                          ? [
                              { value: MENU.Edit, label: '게시물 수정' },
                              { value: MENU.Delete, label: '게시물 삭제' },
                            ]
                          : [{ value: MENU.Report, label: '게시물 신고' }]
                      }
                      onSelect={handleDropdownSelect}
                      className="right-0 top-[2.9rem] mt-0"
                    />
                  )}
                </div>
              </div>
              <PostDetailContent title={post.title} content={post.content} />
              <ImageList
                images={post.worryFiles.map((file) => file.url)}
                onClick={(index) => setZoomedImageIndex(index)}
              />
              {zoomedImageIndex !== null && (
                <ImageFullScreen
                  images={post.worryFiles.map((file) => file.url)}
                  initialIndex={zoomedImageIndex}
                  onClose={() => setZoomedImageIndex(null)}
                />
              )}
            </>
          ) : (
            <PostSummarySkeleton />
          )}
        </div>
        {comments && post ? (
          <CommentList writerId={post.user.id} comments={comments} />
        ) : (
          commentLoading &&
          Array(10)
            .fill(null)
            .map((_, i) => <CommentSkeleton key={i} />)
        )}
      </div>
      <CommentInput />
      {post && (
        <Popup
          isOpen={deleteModalOpen}
          text="게시물을 삭제하시겠습니까?"
          subText="이 작업은 실행 취소할 수 없습니다."
          buttonLabel="게시물 삭제"
          onCancel={() => setDeleteModalOpen(false)}
          onClickButton={() => deletePost(post.id)}
        />
      )}
    </div>
  );
}

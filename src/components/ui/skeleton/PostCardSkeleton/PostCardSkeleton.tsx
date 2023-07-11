import { twMergeCustom } from '@/libs/tw-merge';

interface PostCardSkeletonProps {
  className?: string;
}

export default function PostCardSkeleton({ className }: PostCardSkeletonProps) {
  return (
    <div
      className={twMergeCustom(
        'h-[13.3rem] w-full rounded-[7px] border border-custom-background-100 bg-white px-[1.7rem] py-[1.3rem]',
        className
      )}
    >
      <div className="flex items-center space-x-[0.5rem]">
        <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-custom-background-100" />
        <div className="h-[1.8rem] w-[11rem] rounded-[3px] bg-custom-background-100" />
      </div>
      <div className="mt-[0.3rem] flex w-full items-center justify-between space-x-[1.7rem]">
        <div className="flex-1 space-y-[0.7rem]">
          <div className="h-[2.4rem] w-full rounded-[3px] bg-custom-background-100" />
          <div className="h-[1.8rem] w-full rounded-[3px] bg-custom-background-100" />
        </div>
        <div className="h-[6.4rem] w-[6.4rem] rounded-[5px] bg-custom-background-100" />
      </div>
      <div className="mt-[0.5rem] h-[1.3rem] w-[11rem] rounded-[3px] bg-custom-background-100" />
    </div>
  );
}
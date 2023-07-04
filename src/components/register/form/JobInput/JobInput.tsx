import TextInput from '@/components/ui/inputs/TextInput';

interface JobInputProps {
  className?: string;
  successMessage?: string | null;
  errorMessage?: string | null;
  onChange?: (job: string) => void;
}

export default function JobInput({
  className,
  successMessage,
  errorMessage,
  onChange,
}: JobInputProps) {
  return (
    <TextInput
      label="직업"
      placeholder="직업 입력"
      className={className}
      successMessage={successMessage}
      errorMessage={errorMessage}
      maxLength={20}
      onChange={onChange}
    />
  );
}

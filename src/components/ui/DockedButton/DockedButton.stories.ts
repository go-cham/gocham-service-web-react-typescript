import type { Meta, StoryObj } from '@storybook/react';

import DockedButton from '@/components/ui/DockedButton';

const meta = {
  title: 'UI/Buttons/DockedButton',
  component: DockedButton,
  tags: ['autodocs'],
} satisfies Meta<typeof DockedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'button',
    onClick: () => console.log('clicked!'),
  },
};

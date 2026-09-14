import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tag from '@components/blog/Tag';

const setup = (initial: string[] = []) => {
  const onTagBlur = vi.fn();
  render(<Tag intialState={initial} placeholder='포스팅 태그' onTagBlur={onTagBlur} />);
  const input = screen.getByPlaceholderText(/포스팅 태그/);
  return { input, onTagBlur, user: userEvent.setup() };
};

describe('Tag', () => {
  it('Enter로 #태그를 추가하고 입력을 비운다', async () => {
    const { input, user } = setup();
    await user.type(input, 'react{Enter}');
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('같은 태그는 중복 추가되지 않는다', async () => {
    const { input, user } = setup(['#react']);
    await user.type(input, 'react{Enter}');
    expect(screen.getAllByText('#react')).toHaveLength(1);
  });

  it('5개를 넘기면 추가되지 않고 placeholder에 5/5가 표시된다', async () => {
    const { input, user } = setup(['#a', '#b', '#c', '#d', '#e']);
    await user.type(input, 'f{Enter}');
    expect(screen.queryByText('#f')).not.toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', '포스팅 태그 (5/5)');
  });

  it('입력이 비어 있을 때 Backspace는 마지막 태그를 지운다', async () => {
    const { input, user } = setup(['#a', '#b']);
    await user.click(input);
    await user.keyboard('{Backspace}');
    expect(screen.queryByText('#b')).not.toBeInTheDocument();
    expect(screen.getByText('#a')).toBeInTheDocument();
  });

  it('blur 시 현재 태그 목록을 콜백으로 넘긴다', async () => {
    const { input, onTagBlur, user } = setup(['#a']);
    await user.type(input, 'b{Enter}');
    await user.tab();
    expect(onTagBlur).toHaveBeenLastCalledWith(['#a', '#b']);
  });
});

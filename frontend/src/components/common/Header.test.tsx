import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/render';
import Header from './Header';

describe('Header', () => {
  it('로고 이미지에 크기를 명시하고 webp를 쓴다', () => {
    renderWithProviders(<Header />);
    const logo = screen.getAllByAltText('logo')[0];
    expect(logo).toHaveAttribute('width', '214');
    expect(logo).toHaveAttribute('height', '77');
    expect(logo.getAttribute('src')).toMatch(/white_logo.*\.webp$/);
  });
});

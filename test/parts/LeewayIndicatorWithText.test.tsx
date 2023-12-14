import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import LeewayIndicatorWithText from '../../src/parts/LeewayIndicatorWithText';

describe('LeewayIndicatorWithText', () => {
  test('renders with medium level', () => {
    render(<LeewayIndicatorWithText level='medium' />);
    expect(screen.getByText('まあまあ')).toBeInTheDocument();
  });

  test('renders with low level', () => {
    render(<LeewayIndicatorWithText level='low' />);
    expect(screen.getByText('忙しい')).toBeInTheDocument();
  });

  test('renders with none level', () => {
    render(<LeewayIndicatorWithText level='none' />);
    expect(screen.getByText('厳しい')).toBeInTheDocument();
  });

  test('renders with high level', () => {
    render(<LeewayIndicatorWithText level='high' />);
    expect(screen.getByText('余裕')).toBeInTheDocument();
  });

  test('renders with default level', () => {
    render(<LeewayIndicatorWithText />);
    expect(screen.getByText('余裕')).toBeInTheDocument();
  });
});

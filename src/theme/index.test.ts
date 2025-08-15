import { describe, it, expect } from 'vitest';
import { theme } from './index';

describe('theme', () => {
  it('should have the correct palette configuration', () => {
    expect(theme.palette.primary.main).toBe('#1976d2');
    expect(theme.palette.secondary.main).toBe('#dc004e');
    expect(theme.palette.background.default).toBe('#f5f5f5');
    expect(theme.palette.background.paper).toBe('#ffffff');
  });

  it('should have custom typography settings', () => {
    expect(theme.typography.h4?.fontWeight).toBe(600);
    expect(theme.typography.h4?.color).toBe('#1a1a1a');
    expect(theme.typography.h5?.fontWeight).toBe(500);
    expect(theme.typography.h5?.color).toBe('#1a1a1a');
  });

  it('should have custom component overrides', () => {
    expect(theme.components?.MuiCard?.styleOverrides?.root?.boxShadow).toBe('0 2px 8px rgba(0, 0, 0, 0.1)');
    expect(theme.components?.MuiCard?.styleOverrides?.root?.borderRadius).toBe(12);
    expect(theme.components?.MuiButton?.styleOverrides?.root?.borderRadius).toBe(8);
    expect(theme.components?.MuiButton?.styleOverrides?.root?.textTransform).toBe('none');
  });

  it('should be a valid MUI theme', () => {
    expect(theme).toBeDefined();
    expect(typeof theme.palette).toBe('object');
    expect(typeof theme.typography).toBe('object');
    expect(typeof theme.components).toBe('object');
  });
});

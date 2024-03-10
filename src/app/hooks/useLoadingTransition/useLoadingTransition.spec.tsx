import { ReactNode } from 'react';
import { WrapperComponent, renderHook } from '@testing-library/react-hooks';
import { useLoadingTransition } from './useLoadingTransition';
import { AppContext, AppContextType } from 'app/context';

const elementRef = { current: document.createElement('div') };

const CustomWrapper: WrapperComponent<{
  children?: ReactNode;
  initialProps: AppContextType;
}> = ({ children, initialProps }) => (
  <AppContext.Provider value={initialProps}>{children}</AppContext.Provider>
);

const renderTitleVisibilityCustomHook = (initialProps: AppContextType) =>
  renderHook(() => useLoadingTransition(elementRef), {
    wrapper: CustomWrapper,
    initialProps: { initialProps }
  });

describe('Hooks: useLoadingTransition', () => {
  it('Should apply visible styles when isLoading is false', () => {
    renderTitleVisibilityCustomHook({ isLoading: false });
    expect(elementRef.current.style.opacity).toBe('1');
  });

  it('Should apply hidden styles when isLoading is true', () => {
    renderTitleVisibilityCustomHook({ isLoading: true });
    expect(elementRef.current.style.opacity).toBe('0');
  });
});

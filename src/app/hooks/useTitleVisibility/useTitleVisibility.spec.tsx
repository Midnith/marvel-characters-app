import { ReactNode } from 'react';
import { WrapperComponent, renderHook } from '@testing-library/react-hooks';
import { useTitleVisibility } from './useTitleVisibility';
import { AppContext, AppContextType } from 'app/context';

const titleRef = { current: document.createElement('div') };

const CustomWrapper: WrapperComponent<{
  children?: ReactNode;
  initialProps: AppContextType;
}> = ({ children, initialProps }) => (
  <AppContext.Provider value={initialProps}>{children}</AppContext.Provider>
);

const renderTitleVisibilityCustomHook = (initialProps: AppContextType) =>
  renderHook(() => useTitleVisibility(titleRef), {
    wrapper: CustomWrapper,
    initialProps: { initialProps }
  });

describe('Hooks: useTitleVisibility', () => {
  it('Should apply visible styles when showFavourites is true', () => {
    renderTitleVisibilityCustomHook({ showFavourites: true });
    expect(titleRef.current.style.height).toBe('');
    expect(titleRef.current.style.paddingBottom).toBe('1.5rem');
    expect(titleRef.current.style.visibility).toBe('visible');
    expect(titleRef.current.style.opacity).toBe('1');
  });

  it('Should apply hidden styles when showFavourites is false', () => {
    renderTitleVisibilityCustomHook({ showFavourites: false });
    expect(titleRef.current.style.height).toBe('0px');
    expect(titleRef.current.style.paddingBottom).toBe('0px');
    expect(titleRef.current.style.visibility).toBe('hidden');
    expect(titleRef.current.style.opacity).toBe('0');
  });
});

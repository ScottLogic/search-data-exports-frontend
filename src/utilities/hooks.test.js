import useInputForm from './hooks';

const mockSetState = jest.fn();

jest.mock('react', () => ({
  useState: initial => [initial, mockSetState]
}));

describe('hooks', () => {
  describe('useInputForm hook', () => {
    it('returns a hook to be used by components with stateful forms', () => {
      const result = useInputForm('');
      expect(result.value).toBe('');
      const testEvent = {
        target: {
          value: 'test'
        }
      };
      result.onChange(testEvent);
      expect(mockSetState).toHaveBeenCalledWith('test');
      result.setValue(testEvent);
      expect(mockSetState).toHaveBeenCalledWith(testEvent);
    });
  });
});

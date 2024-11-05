/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */

'use client';

import { Input } from '@nextui-org/input';
import { cn } from '@nextui-org/theme';
import React, {
  useRef, useState, useCallback, KeyboardEvent, ClipboardEvent,
} from 'react';

interface PinInputProps {
  length?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  type?: 'numeric' | 'alphanumeric';
  mask?: boolean;
  disabled?: boolean;
}

export function PinInput({
  length = 6,
  onChange,
  onComplete,
  className = '',
  placeholder = '○',
  autoFocus = false,
  type = 'numeric',
  mask = false,
  disabled = false,
}: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const validate = useCallback((value: string): boolean => {
    if (type === 'numeric') {
      return /^\d*$/.test(value);
    }
    return /^[a-zA-Z0-9]*$/.test(value);
  }, [type]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
      inputRefs.current[index]?.select();
    }
  }, [length]);

  const handleChange = useCallback((index: number, value: string) => {
    if (!validate(value)) return;

    const newValues = [...values];
    const formatted = value.slice(-1);
    newValues[index] = formatted;
    setValues(newValues);

    const completeValue = newValues.join('');
    onChange?.(completeValue);

    const isFilled = newValues.every((val) => val !== '');
    if (isFilled) {
      onComplete?.(completeValue);
    }

    if (formatted && index < length - 1) {
      focusInput(index + 1);
    }
  }, [values, length, onChange, onComplete, validate, focusInput]);

  const handleKeyDown = useCallback((index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (values[index]) {
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
        onChange?.(newValues.join(''));
      } else if (index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  }, [values, length, onChange, focusInput]);

  const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, length);

    if (!validate(pasteData)) return;

    const newValues = [...values];
    pasteData.split('').forEach((char, i) => {
      if (i < length) {
        newValues[i] = char;
      }
    });

    setValues(newValues);
    onChange?.(newValues.join(''));

    if (newValues.every((val) => val !== '')) {
      onComplete?.(newValues.join(''));
    }
  }, [length, onChange, onComplete, validate, values]);

  return (
    <div
      className={cn(
        'flex gap-2 items-center justify-center',
        className,
      )}
    >
      {[...Array(length)].map((_, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode={type === 'numeric' ? 'numeric' : 'text'}
          pattern={type === 'numeric' ? '[0-9]*' : '[a-zA-Z0-9]*'}
          maxLength={1}
          value={values[index]}
          autoFocus={autoFocus && index === 0}
          className={cn(
            'w-12 h-12 text-center text-lg font-semibold rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-offset-emerald-600 focus:border-transparent',
            'transition-all duration-200 text-emerald-500',
            mask && values[index] ? 'text-transparent' : 'text-gray-900',
          )}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

import { useEffect } from 'react';

export function useDebounce(fn: () => void, timeout:number):void {
    useEffect(() => {
        const handler = () => {
            clearTimeout(timeout);
            fn();
        };
        const timeoutId = setTimeout(handler, timeout);

        return () => clearTimeout(timeoutId);
    }, [fn, timeout]);

}
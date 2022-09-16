import {useRef, useEffect, useDebugValue} from 'react';

export function useThrottle(fn: ()=> void, timeOut:number):void {
    const previousFnRef = useRef<(() => void) | null>(null);
    const currentFnRef = useRef<(() => void) | null>(fn)

    if(previousFnRef.current !== fn){
        currentFnRef.current = fn;
    }
    // useDebugValue - Hook to show labels for custom reusable hooks in debug window.
    //Output-> Throttle "() => { saveperson(person); }"
    useDebugValue(currentFnRef.current, (fn) => fn?.toString());
    useEffect(() => {
        const timer = setInterval(() => {
            if(currentFnRef.current){
                previousFnRef.current = currentFnRef.current;
                currentFnRef.current();
                currentFnRef.current = null;
            }
        }, timeOut);
        return () => clearInterval(timer);
    },[timeOut]);

}
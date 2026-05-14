import { createRef, createContext } from "react";

const msPerCharRef = createRef<number>();
msPerCharRef.current = 30;
const TypingSpeedContext = createContext(msPerCharRef as React.RefObject<number>);

export default TypingSpeedContext;
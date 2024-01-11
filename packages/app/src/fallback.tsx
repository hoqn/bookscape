import { createPortal } from "react-dom";

export default function Fallback() {
  return createPortal(<div>Loading...</div>, document.body);
}

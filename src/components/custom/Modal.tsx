import useToggle from "@/hook/useToggle";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type renderType = (handleToggle: () => void) => JSX.Element;
interface ModalProps {
  //   trigger: (handleToggle: () => void) => JSX.Element;
  trigger: JSX.Element;
  //   render: JSX.Element;
  render: renderType | JSX.Element;
  className?: string;
  closeBtn?: boolean;
  // editId?: string;
}
// type overlayType = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
// const handleOverlay: overlayType = (e) => {
//   e.preventDefault();
// };

const Modal: React.FC<ModalProps> = ({
  render,
  trigger,
  closeBtn = true,
  className,
  // editId,
}) => {
  const [toggle, handleToggle] = useToggle(false);
  return (
    <>
      <Dialog open={toggle} onOpenChange={handleToggle}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogOverlay />
        <DialogTitle style={{ display: "none" }}>Hidden Title</DialogTitle>
        <DialogContent
          closeBtn={closeBtn}
          className={className}
          aria-describedby=""
        >
          {typeof render === "function" ? render(handleToggle) : render}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;

import useToggle from "@/hook/useToggle";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";

type renderType = (handleToggle: () => void) => JSX.Element;
interface ModalProps {
  trigger: JSX.Element;
  render: renderType | JSX.Element;
  className?: string;
  closeBtn?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  render,
  trigger,
  closeBtn = true,
  className,
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

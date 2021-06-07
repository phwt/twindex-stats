import { OverlayTrigger, Tooltip } from "react-bootstrap";
interface Props {
  icon?: string;
  placement?: "top" | "right" | "bottom" | "left";
  text: string;
}
const IconTooltip = ({ icon, placement = "top", text }: Props) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip id={`tooltip-${placement}`}>{text}</Tooltip>}
    >
      <i className={`fa fa-${icon}`} />
    </OverlayTrigger>
  );
};

export default IconTooltip;

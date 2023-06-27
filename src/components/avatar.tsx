import { generateFromString } from "generate-avatar";

type AvatarProps = {
  id: string;
  small?: boolean;
};

export default function Avatar({ id, small }: AvatarProps) {
  return (
    <div className={`overflow-hidden rounded-full ${small ? "h-5 w-5" : "h-6 w-6"}`}>
      <img src={`data:image/svg+xml;utf8,${generateFromString(id)}`} alt={`Avatar for ${id}`} width={32} height={32} />
    </div>
  );
}

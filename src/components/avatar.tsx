import { generateFromString } from "generate-avatar";

type AvatarProps = {
  id: string;
};

export default function Avatar({ id }: AvatarProps) {
  return (
    <div className="h-8 w-8 overflow-hidden rounded-full">
      <img src={`data:image/svg+xml;utf8,${generateFromString(id)}`} alt={`Avatar for ${id}`} width={32} height={32} />
    </div>
  );
}

import { PostmanUI } from './PostmanUI';

/* === PostmanPanel — wraps the PostmanUI with the panel name used in App === */

interface PostmanPanelProps {
  onSendRequest: () => void;
  processing: boolean;
}

export function PostmanPanel({ onSendRequest, processing }: PostmanPanelProps) {
  return <PostmanUI onSendRequest={onSendRequest} processing={processing} />;
}

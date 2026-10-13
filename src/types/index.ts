import type { Database } from "./database.types";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Video = Database["public"]["Tables"]["videos"]["Row"];
export type Follow = Database["public"]["Tables"]["follows"]["Row"];
export type Chat = Database["public"]["Tables"]["chats"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type Like = Database["public"]["Tables"]["likes"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type WatchHistory = Database["public"]["Tables"]["watch_history"]["Row"];
export type Playlist = Database["public"]["Tables"]["playlists"]["Row"];
export type PlaylistVideo = Database["public"]["Tables"]["playlist_videos"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type LiveStream = Database["public"]["Tables"]["live_streams"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type LiveStreamPublic = Database["public"]["Views"]["live_streams_public"]["Row"];

export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type VideoInsert = Database["public"]["Tables"]["videos"]["Insert"];
export type FollowInsert = Database["public"]["Tables"]["follows"]["Insert"];
export type ChatInsert = Database["public"]["Tables"]["chats"]["Insert"];
export type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];
export type LikeInsert = Database["public"]["Tables"]["likes"]["Insert"];
export type CommentInsert = Database["public"]["Tables"]["comments"]["Insert"];
export type SubscriptionInsert = Database["public"]["Tables"]["subscriptions"]["Insert"];
export type WatchHistoryInsert = Database["public"]["Tables"]["watch_history"]["Insert"];
export type PlaylistInsert = Database["public"]["Tables"]["playlists"]["Insert"];
export type PlaylistVideoInsert = Database["public"]["Tables"]["playlist_videos"]["Insert"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type LiveStreamInsert = Database["public"]["Tables"]["live_streams"]["Insert"];
export type NotificationInsert = Database["public"]["Tables"]["notifications"]["Insert"];

export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type VideoUpdate = Database["public"]["Tables"]["videos"]["Update"];
export type FollowUpdate = Database["public"]["Tables"]["follows"]["Update"];
export type ChatUpdate = Database["public"]["Tables"]["chats"]["Update"];
export type MessageUpdate = Database["public"]["Tables"]["messages"]["Update"];
export type LikeUpdate = Database["public"]["Tables"]["likes"]["Update"];
export type CommentUpdate = Database["public"]["Tables"]["comments"]["Update"];
export type SubscriptionUpdate = Database["public"]["Tables"]["subscriptions"]["Update"];
export type WatchHistoryUpdate = Database["public"]["Tables"]["watch_history"]["Update"];
export type PlaylistUpdate = Database["public"]["Tables"]["playlists"]["Update"];
export type PlaylistVideoUpdate = Database["public"]["Tables"]["playlist_videos"]["Update"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];
export type LiveStreamUpdate = Database["public"]["Tables"]["live_streams"]["Update"];
export type NotificationUpdate = Database["public"]["Tables"]["notifications"]["Update"];

export type Json = Database["public"]["Tables"]["videos"]["Row"]["language_tracks"];

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          email: string;
          avatar_url: string | null;
          bio: string | null;
          is_creator: boolean | null;
          is_verified: boolean | null;
          is_scholar: boolean | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          email: string;
          avatar_url?: string | null;
          bio?: string | null;
          is_creator?: boolean | null;
          is_verified?: boolean | null;
          is_scholar?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string | null;
          email?: string;
          avatar_url?: string | null;
          bio?: string | null;
          is_creator?: boolean | null;
          is_verified?: boolean | null;
          is_scholar?: boolean | null;
          created_at?: string;
        };
        Relationships: [];
      };
      videos: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          video_url: string;
          thumbnail_url: string | null;
          duration: number | null;
          type: string;
          category: string;
          sub_category: string | null;
          language_tracks: Json | null;
          subtitles: Json | null;
          is_halal_verified: boolean | null;
          is_published: boolean | null;
          views_count: number;
          likes_count: number;
          comments_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          video_url: string;
          thumbnail_url?: string | null;
          duration?: number | null;
          type?: string;
          category?: string;
          sub_category?: string | null;
          language_tracks?: Json | null;
          subtitles?: Json | null;
          is_halal_verified?: boolean | null;
          is_published?: boolean | null;
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          video_url?: string;
          thumbnail_url?: string | null;
          duration?: number | null;
          type?: string;
          category?: string;
          sub_category?: string | null;
          language_tracks?: Json | null;
          subtitles?: Json | null;
          is_halal_verified?: boolean | null;
          is_published?: boolean | null;
          views_count?: number;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      follows: {
        Row: { id: string; follower_id: string; following_id: string; is_mutual: boolean; created_at: string };
        Insert: { id?: string; follower_id: string; following_id: string; is_mutual?: boolean; created_at?: string };
        Update: { id?: string; follower_id?: string; following_id?: string; is_mutual?: boolean; created_at?: string };
        Relationships: [];
      };
      chats: {
        Row: { id: string; user1_id: string; user2_id: string; last_message: string | null; last_message_at: string | null; is_active: boolean; created_at: string };
        Insert: { id?: string; user1_id: string; user2_id: string; last_message?: string | null; last_message_at?: string | null; is_active?: boolean; created_at?: string };
        Update: { id?: string; user1_id?: string; user2_id?: string; last_message?: string | null; last_message_at?: string | null; is_active?: boolean; created_at?: string };
        Relationships: [];
      };
      messages: {
        Row: { id: string; chat_id: string; sender_id: string; content: string | null; type: string; is_read: boolean; created_at: string };
        Insert: { id?: string; chat_id: string; sender_id: string; content?: string | null; type?: string; is_read?: boolean; created_at?: string };
        Update: { id?: string; chat_id?: string; sender_id?: string; content?: string | null; type?: string; is_read?: boolean; created_at?: string };
        Relationships: [];
      };
      likes: {
        Row: { id: string; user_id: string; video_id: string; created_at: string };
        Insert: { id?: string; user_id: string; video_id: string; created_at?: string };
        Update: { id?: string; user_id?: string; video_id?: string; created_at?: string };
        Relationships: [];
      };
      comments: {
        Row: { id: string; user_id: string; video_id: string; parent_id: string | null; content: string; likes_count: number; created_at: string };
        Insert: { id?: string; user_id: string; video_id: string; parent_id?: string | null; content: string; likes_count?: number; created_at?: string };
        Update: { id?: string; user_id?: string; video_id?: string; parent_id?: string | null; content?: string; likes_count?: number; created_at?: string };
        Relationships: [];
      };
      subscriptions: {
        Row: { id: string; subscriber_id: string; channel_id: string; created_at: string };
        Insert: { id?: string; subscriber_id: string; channel_id: string; created_at?: string };
        Update: { id?: string; subscriber_id?: string; channel_id?: string; created_at?: string };
        Relationships: [];
      };
      watch_history: {
        Row: { id: string; user_id: string; video_id: string; position: number; watched_at: string };
        Insert: { id?: string; user_id: string; video_id: string; position?: number; watched_at?: string };
        Update: { id?: string; user_id?: string; video_id?: string; position?: number; watched_at?: string };
        Relationships: [];
      };
      playlists: {
        Row: { id: string; user_id: string; name: string; is_public: boolean; created_at: string };
        Insert: { id?: string; user_id: string; name: string; is_public?: boolean; created_at?: string };
        Update: { id?: string; user_id?: string; name?: string; is_public?: boolean; created_at?: string };
        Relationships: [];
      };
      playlist_videos: {
        Row: { id: string; playlist_id: string; video_id: string; position: number };
        Insert: { id?: string; playlist_id: string; video_id: string; position?: number };
        Update: { id?: string; playlist_id?: string; video_id?: string; position?: number };
        Relationships: [];
      };
      posts: {
        Row: { id: string; user_id: string; content: string | null; media_urls: Json | null; likes_count: number; comments_count: number; shares_count: number; created_at: string };
        Insert: { id?: string; user_id: string; content?: string | null; media_urls?: Json | null; likes_count?: number; comments_count?: number; shares_count?: number; created_at?: string };
        Update: { id?: string; user_id?: string; content?: string | null; media_urls?: Json | null; likes_count?: number; comments_count?: number; shares_count?: number; created_at?: string };
        Relationships: [];
      };
      live_streams: {
        Row: { id: string; user_id: string; title: string; stream_key: string; playback_url: string | null; is_live: boolean; viewers_count: number; started_at: string; ended_at: string | null };
        Insert: { id?: string; user_id: string; title: string; stream_key: string; playback_url?: string | null; is_live?: boolean; viewers_count?: number; started_at?: string; ended_at?: string | null };
        Update: { id?: string; user_id?: string; title?: string; stream_key?: string; playback_url?: string | null; is_live?: boolean; viewers_count?: number; started_at?: string; ended_at?: string | null };
        Relationships: [];
      };
      notifications: {
        Row: { id: string; user_id: string; type: string; reference_id: string | null; is_read: boolean; created_at: string };
        Insert: { id?: string; user_id: string; type: string; reference_id?: string | null; is_read?: boolean; created_at?: string };
        Update: { id?: string; user_id?: string; type?: string; reference_id?: string | null; is_read?: boolean; created_at?: string };
        Relationships: [];
      };
    };
    Views: {
      live_streams_public: {
        Row: {
          id: string | null;
          user_id: string | null;
          title: string | null;
          playback_url: string | null;
          is_live: boolean | null;
          viewers_count: number | null;
          started_at: string | null;
          ended_at: string | null;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<
  TableName extends keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][TableName]["Row"];

export type TablesInsert<
  TableName extends keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][TableName]["Insert"];

export type TablesUpdate<
  TableName extends keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][TableName]["Update"];

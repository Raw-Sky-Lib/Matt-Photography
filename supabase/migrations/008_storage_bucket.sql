-- Storage bucket: photography (public read, authenticated write)
-- Note: The INSERT INTO storage.buckets statement requires admin privileges.
-- Create the bucket in Supabase dashboard: Storage → New bucket → "photography" → Public: ON
-- Or via CLI: supabase storage create photography --public

-- Storage object RLS policies
CREATE POLICY "public_read_photography"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'photography');

CREATE POLICY "authenticated_insert_photography"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'photography');

CREATE POLICY "authenticated_update_photography"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'photography');

CREATE POLICY "authenticated_delete_photography"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'photography');

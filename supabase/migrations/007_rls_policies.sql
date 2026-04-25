-- site_settings: public read
CREATE POLICY "anon_read" ON site_settings FOR SELECT TO anon USING (true);

-- pages: read only published
CREATE POLICY "anon_read_published" ON pages FOR SELECT TO anon USING (is_published = true);

-- posts: read only published and past published_at
CREATE POLICY "anon_read_published" ON posts
  FOR SELECT TO anon
  USING (is_published = true AND published_at <= NOW());

-- nav_items: public read
CREATE POLICY "anon_read" ON nav_items FOR SELECT TO anon USING (true);

-- form_submissions: anon insert only (no read)
CREATE POLICY "anon_insert" ON form_submissions FOR INSERT TO anon WITH CHECK (true);

-- media: public read
CREATE POLICY "anon_read" ON media FOR SELECT TO anon USING (true);

CREATE POLICY "anon_read_active"     ON categories     FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "anon_read"            ON gallery_images FOR SELECT TO anon USING (true);
CREATE POLICY "anon_read_published"  ON projects       FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "anon_read"            ON project_images FOR SELECT TO anon USING (true);

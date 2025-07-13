# easyfreecv - Resume Builder Website Nextjs

This is a Next.js application for building resumes. It uses Supabase for the database and storage.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

## Supabase Setup

You need to run the following SQL in your Supabase project's SQL Editor to set up the necessary tables and storage buckets.

### SQL Migration Script

```sql
-- Create Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Resumes Table
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Cover Letters Table
CREATE TABLE cover_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Site Content Table (for admin editable content)
CREATE TABLE site_content (
    key TEXT PRIMARY KEY,
    content JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Storage Buckets
-- Note: You might need to do this through the Supabase Dashboard UI if you lack permissions.
-- Bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket for cover letters
INSERT INTO storage.buckets (id, name, public)
VALUES ('cover_letters', 'cover_letters', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for storage buckets to allow public reads and authenticated uploads
-- Resumes Bucket Policies
CREATE POLICY "Public read access for resumes" ON storage.objects FOR SELECT USING ( bucket_id = 'resumes' );
CREATE POLICY "Authenticated users can upload resumes" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'resumes' AND auth.role() = 'authenticated' );

-- Cover Letters Bucket Policies
CREATE POLICY "Public read access for cover letters" ON storage.objects FOR SELECT USING ( bucket_id = 'cover_letters' );
CREATE POLICY "Authenticated users can upload cover letters" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'cover_letters' AND auth.role() = 'authenticated' );


-- Seed initial data for site content (About page and admin password)
-- IMPORTANT: Replace 'your_hashed_password' with a real bcrypt hash for your admin password.
-- You can generate one from a site like: https://www.bcrypt-generator.com/
INSERT INTO site_content (key, content)
VALUES
    ('about_page', '{
        "paragraph1": "Welcome to easyfreecv, your ultimate solution for crafting the perfect professional resume. Our mission is to empower job seekers by providing intuitive tools and stunning templates that make resume building a seamless and enjoyable experience.",
        "paragraph2": "We believe that a great resume is more than just a document; it’s a personal brand statement. That''s why we''ve combined cutting-edge AI technology with elegant design to help you stand out from the crowd. Our AI assistant offers smart suggestions for skills, descriptions, and hobbies, tailored to your career profile.",
        "paragraph3": "Whether you''re a recent graduate or a seasoned executive, easyfreecv has the right tools for you. Choose from a diverse collection of templates, from modern and creative to professional and minimalist. Customize every detail to reflect your unique skills and experience.",
        "paragraph4": "Join thousands of successful professionals who have landed their dream jobs with a resume created on easyfreecv. Start building your future today—it''s fast, easy, and completely free."
    }'),
    ('admin_password', '{
        "passwordHash": "$2a$10$Y.wL9e/bM...your_own_secure_hash_here"
    }')
ON CONFLICT (key) DO NOTHING;

```

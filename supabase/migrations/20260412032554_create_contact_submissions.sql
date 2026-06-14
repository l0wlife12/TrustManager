/*
  # Create contact_submissions table

  ## Summary
  Creates a table to store contact form submissions from the TrustManager landing page.

  ## New Tables
  - `contact_submissions`
    - `id` (uuid, primary key) - unique identifier
    - `name` (text, not null) - full name of the sender
    - `email` (text, not null) - email address
    - `company` (text) - company name (optional)
    - `subject` (text, not null) - subject of the message
    - `message` (text, not null) - message body
    - `created_at` (timestamptz) - submission timestamp

  ## Security
  - RLS enabled on `contact_submissions`
  - INSERT policy: anyone (including unauthenticated) can submit a contact form
  - SELECT policy: only authenticated users can view submissions (admin use)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

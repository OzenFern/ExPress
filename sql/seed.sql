-- Seed user --
-- Password is seed
INSERT INTO users (email, password)
VALUES (
           'seed@example.com',
           '$2b$12$JhF46pjJMnfq3JhO3Ecvj.xSSQ99ojznrwYyJ/3M4kFx.SHIa.QIO'
       );

-- Seed posts --
INSERT INTO posts (title, blurb, content, user_id)
VALUES
    (
        'Welcome to ExPress',
        'Share your thoughts, ideas, and stories with the world.',
        E'Let your curiosity run free!\n\nThis platform is built for one simple purpose: giving people a place to write and share what matters to them.\n\nWhether it''s a project you''re working on, a lesson you''ve learned, an opinion you want to discuss, or simply a thought worth recording, ExPress gives you a space to put it into words.\n\nFeel free to create, edit, and delete posts as you explore the platform. This post is here to help you get started.\n\nHappy writing!',
        1
    ),
    (
        'Why Writing Things Down Matters',
        'A quick thought on turning ideas into something tangible.',
        E'Ideas are fragile.\n\nA great idea can appear during a walk, while studying, or in the middle of a conversation. The problem is that ideas disappear just as quickly as they arrive.\n\nWriting helps transform thoughts into something more permanent. It forces us to organize our thinking, identify gaps in our understanding, and communicate more clearly.\n\nYou don''t need to be a professional writer to benefit from writing. Sometimes a few paragraphs are enough to clarify an idea that has been floating around in your head for days.\n\nThe next time inspiration strikes, consider writing it down before it slips away.',
        1
    ),
    (
        'My First Project Reflection',
        'Lessons learned while building a small web application.',
        E'Every project teaches something new.\n\nWhen starting a project, it''s easy to focus only on the finished product. In reality, most of the learning happens during the process itself.\n\nYou learn how to debug problems, read documentation, structure your code, and make decisions when there isn''t an obvious answer.\n\nProgress can feel slow at times, but every challenge solved becomes part of your experience.\n\nSmall projects may not look impressive at first glance, but they often provide the foundation for much larger ones in the future.\n\nThe key is to keep building.',
        1
    );
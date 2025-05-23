SELECT event_id, title
FROM Events
WHERE event_id NOT IN (SELECT DISTINCT event_id FROM Sessions); 
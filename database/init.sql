CREATE OR REPLACE FUNCTION notify_my_friends_update()
RETURNS TRIGGER AS $$
DECLARE
    payload JSON;
BEGIN
    payload = json_build_object(
        'table', TG_TABLE_NAME,
        'column', 'name',
        'oldValue', OLD.name,
        'newValue', NEW.name
    );

    PERFORM pg_notify('my_friends_channel', payload::text);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_my_friends_update
AFTER UPDATE ON my_friends
FOR EACH ROW
EXECUTE FUNCTION notify_my_friends_update();
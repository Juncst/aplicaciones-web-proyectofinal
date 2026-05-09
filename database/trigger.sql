CREATE TRIGGER trigger_my_friends_update
AFTER UPDATE ON my_friends
FOR EACH ROW
EXECUTE FUNCTION notify_my_friends_update();
export default function Login() {
  return (
    <div>
      <form>
        <label>
          username <input type="string" />
        </label>
        <label>
          password <input type="password" />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

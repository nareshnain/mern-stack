import { useActionState } from 'react';

export const UseActionState = () => {
  const [stated, formActiond] = useActionState(increment, 0);
  async function increment(previousState: any, formData: any) {
        console.log("Incrementing from:", previousState, "with formData:", formData);
        return previousState + 1;
    }
  return (
    <div>
        UseActionState
        <form>
            {stated}
            <input name="name" defaultValue="Ram" />
            <button formAction={formActiond}>Increment</button>
        </form>
    </div>
  )
}

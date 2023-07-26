export default function changeInput(setter: React.Dispatch<React.SetStateAction<string>>): (e: React.ChangeEvent<HTMLInputElement>) => void {
  return e => setter(e.target.value ?? '');
}
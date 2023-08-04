export default function changeInput(
  setter: React.Dispatch<React.SetStateAction<string>>
): (e: any) => void {
  return e => setter(e.target?.value ?? '');
}

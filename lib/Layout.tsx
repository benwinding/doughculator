
export function Layout(props: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center w-full">
     <div className="max-w-2xl w-full">
      {props.children}
    </div>
  </div>
}

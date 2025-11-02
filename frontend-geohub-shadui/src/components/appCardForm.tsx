// import { Button } from "../components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card"

// type Props<T> = {
//   title: string;
//   children: React.ReactNode;
//   onCancel: () => void;
//   onSave: (data: T) => void;
// };

// export function AppCardForm<T = any>({title,children, onCancel, onSave}: Props<T>) {

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Register a new {title}</CardTitle>
//         <CardDescription>
//            Fill out the fields below to add.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {children}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button type="submit" className="w-44 cursor-pointer" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button
//           variant="outline"
//           className="w-44 cursor-pointer"
//           onClick={() => onSave(dataForm)}>
//           Save
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

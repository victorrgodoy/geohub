import { Button } from "../components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { AppAccordion } from "./appAccordion"

type Props = {
    title: string;
    description: string;
}

export function AppCardContinent({title, description}: Props) {

  return (
     <Card className="w-full shadow-none rounded-sm py-2">
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{title}</CardTitle>
                <Button 
                    type="submit"  
                    variant="link" 
                    className="p-0 cursor-pointer w-fit">
                        Edit
                </Button>    
            </div>
            <CardDescription className="flex justify-between items-center">
                <AppAccordion description={description}/>
            </CardDescription>
        </CardHeader>
     </Card>
  )
}

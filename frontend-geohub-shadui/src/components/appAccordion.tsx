import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

type Props = {
  description: string;
}

export function AppAccordion({description}: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>{description}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

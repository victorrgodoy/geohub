import { MapPin } from 'lucide-react';

import { Button } from "./ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item"

type Props = {
    title: string;
    description: string;
    onEdit: () => void;
    onExplore: () => void;
}

export function AppItem({title, description , onEdit, onExplore}: Props) {
  return (
    <div className="flex w-full flex-col">
      <Item variant="outline">
          <ItemMedia>
            <MapPin className="size-6 mt-2 text-icon"/>
          </ItemMedia>
        <ItemContent>
          <ItemTitle className='text-lg'>{title}</ItemTitle>
          <ItemDescription>
            {description}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button 
            variant="ghost" 
            size="sm" 
            className='cursor-pointer'
            onClick={onEdit}
            >
            Edit
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className='cursor-pointer'
            onClick={onExplore}
            >
            Explore
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}

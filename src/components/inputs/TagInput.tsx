
import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type TagInputProps = {
  placeholder?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  label?: string;
  maxTags?: number;
  disabled?: boolean;
};

const TagInput = ({
  placeholder = 'Add tag...',
  tags = [],
  onChange,
  suggestions = [],
  label,
  maxTags = 100,
  disabled = false,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) && 
      !tags.includes(suggestion)
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    // If Enter is pressed and there's text, add as tag
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (!tags.includes(inputValue) && tags.length < maxTags) {
        onChange([...tags, inputValue.trim()]);
        setInputValue('');
      }
    } 
    // If Backspace is pressed and there's no text, remove the last tag
    else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
    // If comma is pressed, treat it as a separator
    else if (e.key === ',' && inputValue) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(',', '');
      if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
        onChange([...tags, newTag]);
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    if (disabled) return;
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const handleSelectSuggestion = (value: string) => {
    if (!tags.includes(value) && tags.length < maxTags) {
      onChange([...tags, value]);
      setInputValue('');
      setOpen(false);
      inputRef.current?.focus();
    }
  };

  // Focus the input when clicking on the container
  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  // Close the suggestions when clicking outside
  useEffect(() => {
    if (!isFocused && !inputValue) {
      setOpen(false);
    }
  }, [isFocused, inputValue]);

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      
      <div
        className={`flex flex-wrap gap-2 p-2 rounded-md border min-h-[42px] ${isFocused ? 'ring-2 ring-ring ring-offset-background' : ''} ${disabled ? 'opacity-60 bg-muted' : ''}`}
        onClick={handleContainerClick}
      >
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-sm h-6">
            {tag}
            {!disabled && (
              <button
                type="button"
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-background"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag}</span>
              </button>
            )}
          </Badge>
        ))}
        
        <Popover open={open && filteredSuggestions.length > 0} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              ref={inputRef}
              disabled={disabled || tags.length >= maxTags}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (e.target.value) {
                  setOpen(true);
                }
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 min-w-[120px] border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={tags.length === 0 ? placeholder : ''}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup>
                  {filteredSuggestions.slice(0, 5).map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      value={suggestion}
                      onSelect={handleSelectSuggestion}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${tags.includes(suggestion) ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <span>{suggestion}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {tags.length < maxTags && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-muted-foreground"
            onClick={() => inputRef.current?.focus()}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        )}
      </div>
      
      {maxTags && (
        <div className="text-xs text-muted-foreground flex justify-between">
          <span>{tags.length} {tags.length === 1 ? 'tag' : 'tags'}</span>
          <span>{tags.length}/{maxTags}</span>
        </div>
      )}
    </div>
  );
};

export default TagInput;

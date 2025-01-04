'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";

import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IComboBoxOption {
    value: string,
    label: string
}

interface IComboBoxTagsProps {
    option: IComboBoxOption,
    setComboBoxState: Dispatch<SetStateAction<IComboBoxOption[]>>,
}

interface IComboBoxProps {
    options: IComboBoxOption[],
    selectedOptions: IComboBoxOption[],
    setComboBoxState: Dispatch<SetStateAction<IComboBoxOption[]>>,
    placeholder: string
}
    
export default function ComboBox({options, selectedOptions, setComboBoxState, placeholder } : IComboBoxProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleToggleOption = (value: string, currentOption: IComboBoxOption) => {

        setComboBoxState(prevState => { 

            const optionIndex = prevState.findIndex(item => item.value === value);

            // if the current option is selected, remove the item
            if(optionIndex > -1) {

                const newOptions = [...prevState].filter(item => item.value != value);

                return newOptions;
            }

            // add to the selected options if the current value is not selected
            return [...prevState, { label: currentOption.label, value: currentOption.value }];

        });
    };

    const isSelected = (value: string) => {

        const selectedOption = selectedOptions.find(item => item.value === value);

        return selectedOption ? true : false;
    };

    return (
        <>

            {selectedOptions &&
                selectedOptions.map(option => {
                    return(
                        <IComboBoxTag
                            key={option.value}
                            option={option}
                            setComboBoxState={setComboBoxState}/>
                    );
                })
            }
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button 
                     variant="outline"
                     role="combobox"
                     aria-expanded={isOpen}
                     className="w-full justify-between h-[36px]">
                        {placeholder}
                        <ChevronsUpDown/>
                     </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput 
                            placeholder="Search..."/>
                        <CommandList>
                            <CommandEmpty>No options found.</CommandEmpty>
                           
                            {options.map(item => {
                                return (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={(currentValue) => {

                                            handleToggleOption(currentValue, item);

                                            setIsOpen(false);
                                        }}>

                                        {item.label}

                                        <Check
                                            className={cn(
                                            "ml-auto",  
                                            `${isSelected(item.value) ? 'opacity-100' : 'opacity-0'}`
                                            )}
                                        />
                                    </CommandItem>
                                );
                            })}
                            
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}


function IComboBoxTag({ option, setComboBoxState } : IComboBoxTagsProps) {

    const handleRemoveTag = (value: string) => {

        setComboBoxState(prevOptions => [...prevOptions].filter(item => item.value != value));
    };

    return (
        <Button 
            key={option.value} 
            className="mb-4 mr-2 text-xs leading-none rounded-xl py-2 px-2 pr-3"
            onClick={() => { handleRemoveTag(option.value) }}>
                <X size={10} 
                strokeWidth={1} /> {option.label}
        </Button>
    );
}
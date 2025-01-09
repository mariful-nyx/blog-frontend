import { FC, useState } from 'react';
import { SubCategories, Categories, SubSubCategories } from '@/types/type';

interface CategoryProps {
    categories: Categories[];
    onSelect?: (subsubcat: SubSubCategories) => void; // Prop for the onSelect function
}

const CategoryList: FC<CategoryProps> = ({ categories, onSelect }) => {
    return (
        <ul className='h-[200px] overflow-y-auto'>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} onSelect={onSelect} />
            ))}
        </ul>
    );
};

interface CategoryItemProps {
    category: Categories;
    onSelect?: (subsubcat: SubSubCategories) => void; // Prop for the onSelect function
}

const CategoryItem: FC<CategoryItemProps> = ({ category, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubcategories = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryClick = () => {
     
        toggleSubcategories(); // Toggle the subcategories display
    };

    return (
        <li>
            <div onClick={handleCategoryClick} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {category.name}
            </div>
            {isOpen && (
                <ul style={{ marginLeft: '20px' }}>
                    {category.subcategories && category.subcategories.map((subcategory) => (
                        <SubcategoryItem 
                            key={subcategory.id} 
                            subcategory={subcategory} 
                            onSelect={onSelect} // Pass onSelect down to SubcategoryItem
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

interface SubcategoryItemProps {
    subcategory: SubCategories;
    onSelect?: (subsubcat: SubSubCategories) => void; // Prop for the onSelect function
}

const SubcategoryItem: FC<SubcategoryItemProps> = ({ subcategory, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubsubcategories = () => {
        setIsOpen(!isOpen);
    };

    const handleSubcategoryClick = () => {
     
        toggleSubsubcategories(); // Toggle the subsubcategories display
    };

    return (
        <li>
            <div onClick={handleSubcategoryClick} style={{ cursor: 'pointer', fontStyle: 'italic' }}>
                {subcategory.name}
            </div>
            {isOpen && (
                <ul style={{ marginLeft: '20px' }}>
                    {subcategory.subsubcategories && subcategory.subsubcategories.map((subsubcategory) => (
                        <li 
                            key={subsubcategory.id}
                            onClick={() => onSelect?.(subsubcategory)} // Trigger onSelect for subsubcategory
                            style={{ cursor: 'pointer' }}
                        >
                            {subsubcategory.name}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default CategoryList;

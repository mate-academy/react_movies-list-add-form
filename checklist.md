1. [CODE STYLE] - Don't use one-letter variable naming. (It could be confusing for another developer, who reads your code. Also, it would really hard to find this variable in the code editor using search)

BAD EXAMPLE:
```jsx
onChange={(e) => setVariable(e.target.value)}
```

GOOD EXAMPLE:
```jsx
onChange={(event) => setVariable(event.target.value)}
```


ALSO GOOD EXAMPLE:
```jsx
onChange={(changeEvent) => setVariable(changeEvent.target.value)}
```

2. [CODE STYLE] - Don't repeat yourself. If you see that you copy/paste some block code, maybe, it's time to create a separate variable/function
3. [CODE KNOWLEDGE] - If you are using a non-mutating array method, you **don't** need to create a copy of the array

BAD EXAMPLE:
```jsx
const filteredCats = [...cats].filter(cat => cat.age > 6);
```

GOOD EXAMPLE:
```jsx
const filteredCats = cats.filter(cat => cat.age > 6);
```

4. [REACT KNOWLEDGE] - Don't render the component if the property that you pass to the component has `null` or `undefined` value.

BAD EXAMPLE:
```jsx
const CatInfo: FC<Props> = (props) => {
  const { cat } = props;
  
  return (
    {cat 
     ? <p>{cat.name}</p>
     : null
  );
}
```

GOOD EXAMPLE:
```jsx
const CatInfo: FC<Props> = (props) => {
  const { cat } = props;
  
  return (
    <p>{cat.name}</p>
  );
}

....


{cat 
  ? <CatInfo cat={cat} /> 
  : <p>No cat found</p>
}
```

5. Prepare data in one place (App component) and pass it to child components. Don't use `import` keyword in non-root components

BAD EXAMPLE:
```jsx
import owners from './owners';

const CatInfo: FC<Props> = (props) => {
  const { cat } = props;
  const { ownerId } = props;
  
  const foundOwner = owners.find(owner => owner.id === ownerId);
  
  return (
    <>
     <p>{cat.name}</p>
     <p>{foundOwner.name}</p>
    </>
  );
}
```

GOOD EXAMPLE:
```jsx
import owners from './owners';

const catWithOwner = {
  ...cat,
  owner: owners.find(owner => owner.id === ownerId) || null
}

const App: FC = () => {
  return (
    {catWithOwner 
      ? <CatInfo cat={catWithOwner} />
      : <p>No cat was found</p>
    }
  )
}
```
```jsx
import owners from './owners';

const CatInfo: FC<Props> = (props) => {
  const { cat } = props;
  const { owner, name } = props;
  
  return (
    <>
     <p>{name}</p>
     <p>{owner.name}</p>
    </>
  );
}
```

6. [CODE KNOWLEDGE] - While handling form values, trigger submit logic using `onSubmit` prop of form, instead of `onClick` submit button

BAD EXAMPLE:
```jsx

const AddCatForm: FC<Props> = (props) => {
  const handleSubmit = () => {};
  
  return (
    <form>
      <input type="text />
      <button type="submit" onClick={handleSubmit}>
        Add cat
      </button>
    </form>
  );
}
```

GOOD EXAMPLE:
```jsx

const AddCatForm: FC<Props> = (props) => {
  const handleSubmit = () => {};
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text />
      <button type="submit">
        Add cat
      </button>
    </form>
  );
}
```

import {render} from '@testing-library/react';
import {Slot, SlotProps} from './Slot';
import {useContent} from '../hooks/useContent';

jest.mock('../hooks/useContent', () => ({
    useContent: jest.fn(),
}));

describe('<Slot/>', () => {
    it('should fetch and render a slot', () => {
        const {id, children, ...options}: SlotProps<{title: string}> = {
            id: 'home-banner',
            children: jest.fn(({title}) => title),
            initial: {title: 'initial'},
            fallback: {title: 'fallback'},
        };

        const result = {title: 'result'};

        (useContent as jest.Mock).mockReturnValue(result);

        const {getByText} = render(
            <Slot id={id} {...options}>
                {children}
            </Slot>,
        );

        expect(useContent).toHaveBeenCalledWith(id, options);
        expect(children).toHaveBeenCalledWith(result);
        expect(getByText(result.title)).not.toBeNull();
    });
});

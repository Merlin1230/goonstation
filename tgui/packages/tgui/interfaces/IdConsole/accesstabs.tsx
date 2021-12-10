import { Fragment } from 'inferno';
import { IdConsole } from '.';
import { useBackend, useLocalState } from '../../backend';
import { Button, Box, Divider, NumberInput, Section, Stack, Tabs, Tooltip, Table } from '../../components';
import { Window } from '../../layouts';
import { IdConsoleData, id, accessNumber, accessTabKeys } from './type';

type accessTabProps = {
  list: number[]
  id: id
}

export const AccessTab = (props: accessTabProps, context) => {
  const { act } = useBackend(context);

  return (
    <Box>
      {props.list.map((access) => (
        <Button.Checkbox
          key={access}
          checked={props.id.access.includes(access)}
          onClick={() => act('toggle-access', { access: access })}
        >
          {accessNumber[access].replace(/_/g, ' ')}
        </Button.Checkbox>
      ))}
    </Box>
  );
};

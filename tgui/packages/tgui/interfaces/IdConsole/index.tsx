import { Fragment } from 'inferno';
import { useBackend, useLocalState } from '../../backend';
import { Button, Box, Divider, NumberInput, Section, Stack, Tabs, Tooltip, Table } from '../../components';
import { Window } from '../../layouts';
import { IdConsoleData, id, accessNumber, accessTabKeys } from './type';

export const IdConsole = (props, context) => {
  const { act, data } = useBackend<IdConsoleData>(context);
  const [accessMenu, setAccessMenu] = useLocalState(context, 'accessMenu', accessTabKeys.Civillian);
  const authorizied = data.scannedId.hasId
    ? data.scannedId.access.includes(accessNumber.ID_console)
    : false;

  return (
    <Window
      title="ID Console"
      width={515}
      height={500}
    >
      <Section>
        <Stack vertical>
          <Stack.Item>
            <IdSlot slotName="Target" id={data.modifiedId} />
          </Stack.Item>
          <Stack.Item>
            <IdSlot slotName="Authorizing" id={data.scannedId} />
          </Stack.Item>
        </Stack>
      </Section>
      <Section>
        {data.modifiedId.hasId && authorizied
        && (
          <Stack vertical>
            <Stack.Item>
              Name:
              <Button>
                {data.modifiedId.registered}
              </Button>
            </Stack.Item>
            <Stack.Item>
              Job:
              <Button>
                {data.modifiedId.assignment}
              </Button>
            </Stack.Item>
            <Stack.Item>
              Pronouns:
              <Button>
                {data.modifiedId.pronoun}
              </Button>
            </Stack.Item>
            <Divider hidden />
            <Stack.Item>
              <Stack>
                <Stack.Item>
                  <Tabs vertical>
                    <ConsoleTab
                      name="Civillian"
                      tabkey={accessTabKeys.Civillian}
                      list={data.civillian}
                    />
                    <ConsoleTab
                      name="Engineering"
                      tabkey={accessTabKeys.Engineering}
                      list={data.engineering}
                    />
                    <ConsoleTab
                      name="Supply"
                      tabkey={accessTabKeys.Supply}
                      list={data.supply}
                    />
                    <ConsoleTab
                      name="Research"
                      tabkey={accessTabKeys.Research}
                      list={data.research}
                    />
                    <ConsoleTab
                      name="Security"
                      tabkey={accessTabKeys.Security}
                      list={data.security}
                    />
                    <ConsoleTab
                      name="Command"
                      tabkey={accessTabKeys.Command}
                      list={data.command}
                    />
                  </Tabs>
                </Stack.Item>
                <Stack.Item>
                  <Section>
                    {accessMenu === accessTabKeys.Civillian
                    && <AccessTab list={data.civillian} />}
                    {accessMenu === accessTabKeys.Engineering
                    && <AccessTab list={data.engineering} />}
                    {accessMenu === accessTabKeys.Supply
                    && <AccessTab list={data.supply} />}
                    {accessMenu === accessTabKeys.Research
                    && <AccessTab list={data.research} />}
                    {accessMenu === accessTabKeys.Security
                    && <AccessTab list={data.security} />}
                    {accessMenu === accessTabKeys.Command
                    && <AccessTab list={data.command} />}
                  </Section>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        )}
      </Section>
    </Window>
  );
};

type IdSlotProps = {
  slotName: string
  id?: id
}

const IdSlot = (props: IdSlotProps, context) => {
  const { act } = useBackend(context);

  return (
    <Stack>
      <Stack.Item>
        <Box>{`${props.slotName} ID:`}</Box>
      </Stack.Item>
      <Stack.Item>
        <Button
          color={props.id.hasId ? 'default' : 'transparent'}
          onClick={() => act('eject-or-insert-id', { slot: props.slotName })}
        >
          {props.id.hasId
            ? `${props.id.registered}'s ID card (${props.id.assignment})`
            : 'No card inserted'}
        </Button>
      </Stack.Item>
    </Stack>
  );
};

type accessTabProps = {
  list: number[]
}

export const AccessTab = (props: accessTabProps, context) => {
  const { act, data } = useBackend<IdConsoleData>(context);

  return (
    <Stack wrap>
      {props.list.map((access) => (
        <Stack.Item key={access}>
          <Button.Checkbox
            textAlign="center"
            checked={data.modifiedId.access.includes(access)}
            onClick={() => act('toggle-access', { access: access })}
            width="200px"
          >
            {accessNumber[access].replace(/_/g, ' ')}
          </Button.Checkbox>
        </Stack.Item>
      ))}
    </Stack>
  );
};

type consoleTabProps ={
  list: number[]
  name: string
  tabkey: accessTabKeys
}

const ConsoleTab = (props: consoleTabProps, context) => {
  const { act, data } = useBackend<IdConsoleData>(context);
  const [accessMenu, setAccessMenu] = useLocalState(context, 'accessMenu', accessTabKeys.Civillian);
  let accessAmount: number = 0;

  props.list.forEach(element => {
    if (data.modifiedId.access.includes(element)) {
      accessAmount += 1;
    }
  });

  return (
    <Tabs.Tab
      selected={accessMenu === props.tabkey}
      onClick={() => setAccessMenu(props.tabkey)}
    >
      {`${props.name} ${accessAmount}/${props.list.length}`}
    </Tabs.Tab>
  );
};
